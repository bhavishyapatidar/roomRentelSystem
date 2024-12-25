import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const post = useLoaderData();
  const [saved, setSaved] = useState(post.isSaved);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to handle saving the post
  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setSaved((prev) => !prev); // Optimistic update for better UI responsiveness
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.error(err);
      setSaved((prev) => !prev); // Revert the optimistic update on error
    }
  };

  // Function to handle deleting the post
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await apiRequest.delete(`/posts/${post.id}`);
        navigate("/profile"); // Navigate to profile after deletion
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Function to handle sending a message to the owner
  const handleSendMessage = () => {
    if (!currentUser) {
      navigate("/login");
    } else {
      if (post.user && post.userId) {
        navigate(`/chat/${post.userId}`);
      } else {
        console.error("Owner ID not found!");
      }
    }
  };

  return (
    <div className="singlePage">
      {/* Details Section */}
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="Location" />
                  <span>{post.address}</span>
                </div>
                <div className="price">₹ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="User Avatar" />
                <span>{post.user.username}</span>
              </div>
            </div>
            {/* Description */}
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="wrapper">
          {/* General Features */}
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="Utilities" />
              <div className="featureText">
                <span>Utilities</span>
                <p>
                  {post.postDetail.utilities === "owner"
                    ? "Owner is responsible"
                    : "Tenant is responsible"}
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="Pet Policy" />
              <div className="featureText">
                <span>Pet Policy</span>
                <p>{post.postDetail.pet === "allowed" ? "Pets Allowed" : "Pets not Allowed"}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="Income Policy" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>

          {/* Sizes Information */}
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="Size" />
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="Bedrooms" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="Bathroom" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>

          {/* Nearby Places */}
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="School" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? `${post.postDetail.school / 1000} km`
                    : `${post.postDetail.school} m`}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="Bus Stop" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus} m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="Restaurant" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant} m away</p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>

          {/* Action Buttons */}
          <div className="buttons">
            <button onClick={handleSendMessage}>
              <img src="/chat.png" alt="Chat" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{ backgroundColor: saved ? "#fece51" : "white" }}
            >
              <img src="/save.png" alt="Save" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
            {post.isOwner && (
              <button onClick={handleDelete} className="deleteButton">
                <img src="/delete.png" alt="Delete" />
                Delete Post
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
