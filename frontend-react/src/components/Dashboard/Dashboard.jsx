import React, { useState } from "react";
import axiosInstance from "../../AxiosInstance.js";

const Dashboard = () => {
    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        model_year: "",
        milage: "",
        fuel_type: "",
        engine: "",
        transmission: "",
        ext_col: "",
        int_col: "",
        accident: "",
        clean_title: ""
    });

    const [prediction, setPrediction] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post("/predict/", formData);
            console.log("API Response:", response.data);
            setPrediction(response.data.predicted_price);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <form onSubmit={handleSubmit}>

                        {/* Example: add inputs for each feature */}
                        <label htmlFor="brand" className="form-label mt-2 text-light">Brand:</label>
                        <input
                            id="brand"
                            type="text"
                            className="form-control"
                            name="brand"
                            placeholder="Brand"
                            value={formData.brand}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="model" className="form-label mt-2  text-light">Model:</label>
                        <input
                            id="model"
                            type="text"
                            className="form-control"
                            name="model"
                            placeholder="Model"
                            value={formData.model}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="model_year" className="form-label mt-2 text-light">Model Year:</label>
                        <input
                            id="model_year"
                            type="number"
                            className="form-control"
                            name="model_year"
                            placeholder="Model Year"
                            value={formData.model_year}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="milage" className="form-label mt-2 text-light">Mileage:</label>
                        <input
                            id="milage"
                            type="text"
                            className="form-control"
                            name="milage"
                            placeholder="Milage (e.g., 50,000)"
                            value={formData.milage}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="fuel_type" className="form-label mt-2 text-light" >Fuel Type</label>
                        <input
                            id="fuel_type"
                            type="text"
                            className="form-control"
                            name="fuel_type"
                            placeholder="Fuel Type"
                            value={formData.fuel_type}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="engine" className="form-label mt-2 text-light">Engine</label>
                        <input
                            id="engine"
                            type="text"
                            className="form-control"
                            name="engine"
                            placeholder="Engine"
                            value={formData.engine}
                            onChange={handleChange}
                        />
                        <label htmlFor="transmission" className="form-label mt-2 text-light">Transmission</label>
                        <input
                            id="transmission"
                            type="text"
                            className="form-control"
                            name="transmission"
                            placeholder="Transmission"
                            value={formData.transmission}
                            onChange={handleChange}
                        />
                        <label htmlFor="ext_col" className="form-label mt-2  text-light">Exterior color:</label>
                        <input
                            id="ext_col"
                            type="text"
                            className="form-control"
                            name="ext_col"
                            placeholder="Exterior Color"
                            value={formData.ext_col}
                            onChange={handleChange}
                        />
                        <label htmlFor="int_col" className="form-label mt-2 text-light">Interior Color:</label>
                        <input
                            id="int_col"
                            type="text"
                            className="form-control"
                            name="int_col"
                            placeholder="Interior Color"
                            value={formData.int_col}
                            onChange={handleChange}
                        />
                        <label htmlFor="accident" className="form-label mt-2 text-light">Accident:</label>
                        <input
                            id="accident"
                            type="text"
                            className="form-control"
                            name="accident"
                            placeholder="Accident (Yes/No)"
                            value={formData.accident}
                            onChange={handleChange}
                        />
                        <label htmlFor="clean_title" className="form-label mt-2 text-light">Clean Title</label>
                        <input
                            id="clean_title"
                            type="text"
                            className="form-control"
                            name="clean_title"
                            placeholder="Clean Title (Yes/No)"
                            value={formData.clean_title}
                            onChange={handleChange}
                        />

                        <button type="submit" className="btn btn-info mt-3">
                            See Prediction
                        </button>
                    </form>

                    {prediction !== null && (
                        <div className="alert alert-success mt-3">
                            Predicted Price: ${prediction.toLocaleString()}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
