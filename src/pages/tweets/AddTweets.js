import React, { useState } from 'react';

const AddTweets = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        userName: '',
        title: '',
        description: '',
        image: '',
    });
    const [base64Image, setBase64Img]= useState('');

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    //Convert image in to base64
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Update the form state with the base64 image
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    image: reader.result,
                }));
                setBase64Img(reader.result);
            };

            // Read the image file as a data URL
            reader.readAsDataURL(file);
        }
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform any additional actions, like sending data to a server
        //console.log(formData);
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4">Post a Tweet</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="username" className="form-label">User Name:</label>
                            <input type="text" className="form-control" id="username" name="username" value={formData.userName} onChange={handleChange} />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="title" className="form-label">Title:</label>
                            <input type="text" className="form-control" id="title" name="title" value={formData.title} onChange={handleChange} />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="description" className="form-label">Description:</label>
                            <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="image" className="form-label">Image:</label>
                            <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
                            {base64Image && <img src={base64Image} alt="Converted to Base64" width={250} height={300} />}
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary">Post</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTweets;
