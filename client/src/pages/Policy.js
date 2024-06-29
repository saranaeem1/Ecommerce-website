import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout>
      <div className="row contactus mt-5"> 
        <div className="col-md-6 ">
          <img
          className="mt-5"
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
      
        <div className="col-md-4 ">
          <h1 className="bg-dark p-2 text-white text-center">PRIVACY POLICY</h1>
          <p className="text-justify mt-2">
           
Our Privacy Policy ensures your trust and confidence in our commitment to safeguarding your personal information. We prioritize transparency and security, outlining how we collect, use, and protect your data when you interact with our services. 
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
