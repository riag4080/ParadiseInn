import "../styles/Footer.scss"
import { LocationOn, LocalPhone, Email } from "@mui/icons-material"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_left">
        <a href="/">......</a>
      </div>

      <div className="footer_centre">
        <h3>Useful Links</h3>
        <ul>
          <li>About Us</li>
          <li>Terms and Conditions</li>
          <li>Return and Refund Policy</li>
        </ul>
      </div>

      <div className="footer_right">
        <h3>Contact Us</h3>
        <div className="footer_right_info">
          <LocalPhone/>
          <p>+91-7007834562</p>
          <br />
          <p>+91-8543267433</p>
          <Email/>
          <p>shweta.20223260@mnnit.ac.in</p>
          <br />
          <p>riya.20223214@mnnit.ac.in</p>
        </div>
        <img src="/assets/payment.png" alt="payment"/>
      </div>
    </div>
  )
}

export default Footer