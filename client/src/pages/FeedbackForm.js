import React from "react";
import { toast } from "react-hot-toast";

const FeedbackForm = ({
  feedbackType,
  setFeedbackType,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  details,
  setDetails,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <select
        id="dropdown"
        name="dropdown"
        value={feedbackType}
        onChange={(e) => setFeedbackType(e.target.value)}
      >
        <option value="" disabled defaultValue>
          I am interested in
        </option>
        <option value="Feedback">Feedback</option>
        <option value="Inquiring Details">Inquiring Details</option>
      </select>

      <input
        type="text"
        id="name"
        name="name"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        id="email"
        name="email"
        placeholder="Email Address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="tel"
        id="phone"
        name="phone"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <textarea
        id="project"
        name="project"
        placeholder="Detail"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      ></textarea>
      <br />
      <button className="submitbtn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default FeedbackForm;
