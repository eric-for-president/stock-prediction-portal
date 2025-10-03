from rest_framework import serializers

class CarPricePredictionSerializer(serializers.Serializer):
    #ticker=serializers.CharField(max_length=50)
    brand = serializers.CharField()
    model = serializers.CharField()
    model_year = serializers.IntegerField()
    milage = serializers.CharField()  # accept "51,000 mi." or "51000"
    fuel_type = serializers.CharField(allow_blank=True, required=False)
    engine = serializers.CharField(allow_blank=True, required=False)
    transmission = serializers.CharField(allow_blank=True, required=False)
    ext_col = serializers.CharField(allow_blank=True, required=False)
    int_col = serializers.CharField(allow_blank=True, required=False)
    accident = serializers.CharField(allow_blank=True, required=False)
    clean_title = serializers.CharField(allow_blank=True, required=False)

