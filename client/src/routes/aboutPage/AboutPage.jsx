
import "./AboutPage.scss";

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Us</h1>
        <p>Welcome to our Room Rental Service</p>
      </div>
      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            We aim to provide a seamless and efficient platform where students,
            families, and workers living away from their hometown can easily
            find affordable and suitable rooms.
          </p>
        </div>
        <div className="about-section">
          <h2>Why Choose Us?</h2>
          <ul>
            <li>
              <strong>Wide Selection:</strong> Find rooms that meet your specific
              needs, whether its location, price, or size.
            </li>
            <li>
              <strong>Live Chat:</strong> Directly chat with room owners to get
              all your questions answered in real time.
            </li>
            <li>
              <strong>Save & Compare:</strong> Save rooms for future reference and
              compare them easily.
            </li>
            <li>
              <strong>Live Location:</strong> Provide live location and the shortest path.            </li>
          </ul>
        </div>
        <div className="about-section">
          <h2>Our Story</h2>
          <p>
            We understand the challenges of finding the perfect room while
            studying or working away from home. Thats why we created this
            platform to make room rentals easier and more accessible for
            everyone.
          </p>
        </div>
        <div className="about-section">
          <h2>Contact Us</h2>
          <p>
            For more information or assistance, please reach out to us at
            <a href="mailto:info@roomrental.com"> info@roomrental.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
