import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import ToastMessages from "../../constants/ToastMessages";

const AddTweets = () => {
    const history = useHistory();
    // State to manage form data
    const [base64Image, setBase64Img] = useState("");

    const [postData, setPostData] = useState({
        userName: "",
        tweetContent: "",
        tweetImage: "",
    });

    const handlePostRequest = () => {
        console.log(postData);
        fetch(`${process.env.REACT_APP_BASE_URL}/tweets/add-new-tweet`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(postData),

        }).then((response) => {
            console.log(response);
            if (response.ok) {
                //Redirect to tweets list
                history.push("/tweets");
            }
            else {
                toast.error(ToastMessages.Add_Tweet_Failed, {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        }).catch((error) => {
            // Handle errors
            console.error("Error:", error);
            toast.error(ToastMessages.API_Call_Failed, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        });
    };

    // Function to handle form input changes
    const handleChange = (e) => {
        console.log(e);
        const { name, value } = e.target;
        setPostData((prevFormData) => ({
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
                setPostData((prevFormData) => ({
                    ...prevFormData,
                    tweetImage: reader.result,
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
        handlePostRequest();
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h2 className="mb-4">Post a Tweet</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="username" className="form-label">
                                User Name:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="userName"
                                name="userName"
                                value={postData.userName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="tweetContent" className="form-label">
                                Description:
                            </label>
                            <textarea
                                className="form-control"
                                id="tweetContent"
                                name="tweetContent"
                                value={postData.tweetContent}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="image" className="form-label">
                                Image:
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                onChange={handleImageChange}
                            />
                            {base64Image && (
                                <img
                                    src={base64Image}
                                    alt="Converted to Base64"
                                    width={500}
                                    height={300}
                                />
                            )}
                        </div>
                        <div className="text-end">
                            <button type="submit" className="btn btn-primary">
                                Post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddTweets;
