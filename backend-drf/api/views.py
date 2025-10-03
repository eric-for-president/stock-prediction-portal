# api/views.py
import os
import joblib
import numpy as np
import pandas as pd
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import CarPricePredictionSerializer

#Load model + artifacts
MODEL_PATH = os.path.join(settings.BASE_DIR, "api", "used_car_price_model.pkl")
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError(f"Model file not found at {MODEL_PATH}")

artifacts = joblib.load(MODEL_PATH)
pipeline = artifacts.get("pipeline")
expected_features = artifacts.get("features", [])
brand_mapping = artifacts.get("brand_mapping", {})
brand_fill_value = artifacts.get("brand_fill_value", None)


class CarPricePredictionAPIView(APIView):
    """
    POST expects JSON with:
    brand, model, model_year, milage, fuel_type, engine,
    transmission, ext_col, int_col, accident, clean_title
    """
    def post(self, request):
        serializer = CarPricePredictionSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        data = serializer.validated_data

        # Direct numeric milage (no cleaning)
        try:
            milage_val = int(data.get("milage", 0))
        except Exception:
            milage_val = 0

        # Prepare raw dict
        raw = {
            "brand": data.get("brand", "").strip(),
            "model": data.get("model", "").strip(),
            "model_year": int(data.get("model_year", 0)),
            "milage": milage_val,
            "fuel_type": data.get("fuel_type", "").strip(),
            "engine": data.get("engine", "").strip(),
            "transmission": data.get("transmission", "").strip(),
            "ext_col": data.get("ext_col", "").strip(),
            "int_col": data.get("int_col", "").strip(),
            "accident": data.get("accident", "").strip(),
            "clean_title": data.get("clean_title", "").strip(),
        }

        # Build row to exactly match training features
        row = {}
        for feat in expected_features:
            if feat in raw:
                row[feat] = raw[feat]
            elif feat == "Vehicle_Age":
                row[feat] = 2025 - raw["model_year"] if raw["model_year"] else 0
            elif feat == "brand_encoded":
                brand = raw.get("brand", "")
                if brand_mapping:
                    row[feat] = brand_mapping.get(
                        brand, brand_fill_value if brand_fill_value is not None else 0.0
                    )
                else:
                    row[feat] = 0.0
            else:
                row[feat] = 0  # safe default

        try:
            df_input = pd.DataFrame([row], columns=expected_features)
            pred_log = pipeline.predict(df_input)
            pred_value = float(np.expm1(pred_log[0]))  # de-log
            return Response(
                {"status": "success", "predicted_price": round(pred_value, 2)},
                status=status.HTTP_200_OK,
            )
        except Exception as exc:
            return Response(
                {
                    "status": "error",
                    "message": "Prediction failed. Check preprocessing & features.",
                    "error": str(exc),
                    "expected_features": expected_features,
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
