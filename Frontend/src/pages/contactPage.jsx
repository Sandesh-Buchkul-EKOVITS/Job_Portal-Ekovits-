import { useState } from "react";
import { Mail, Phone, Send, CheckCircle } from "lucide-react";
import Header from "../components/common/Header";

export default function ContactPage() {

  const gradient = "linear-gradient(90deg,#ff0066,#8000ff)";

  const [formData, setFormData] = useState({
    userType: "",
    email: "",
    phone: "",
    description: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   console.log("Form submitted:", formData);

  //   setIsSubmitted(true);

  //   setTimeout(() => {
  //     setFormData({
  //       userType: "",
  //       email: "",
  //       phone: "",
  //       description: ""
  //     });
  //     setIsSubmitted(false);
  //   }, 3000);
  // };


  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const res = await fetch(
      "http://localhost:5000/api/contact",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      }
    );

    const data = await res.json();

    if(data.success){

      setIsSubmitted(true);

      setTimeout(() => {
        setFormData({
          userType:"",
          email:"",
          phone:"",
          description:""
        });

        setIsSubmitted(false);

      },3000);

    }

  } catch(err){

    console.log(err);

  }

};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

return (
  <div className="bg-gray-50 min-h-screen">
 
  


      {/* HERO */}

      <section className="py-16">

        <div className="max-w-7xl mx-auto px-4 text-center">

          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Get in{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: gradient }}
            >
              Touch
            </span>
          </h1>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We're here to help! Reach out for support, feedback, or partnership inquiries.
          </p>

        </div>

      </section>



      {/* MAIN SECTION */}

      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12">

          {/* LEFT SIDE */}

          <div className="space-y-8">


            {/* ABOUT */}

            <div className="bg-white rounded-xl p-8 shadow border">

              <h2 className="text-2xl font-bold mb-4">
                About Our Platform
              </h2>

              <p className="text-gray-600 mb-5">
                Our job platform connects talented professionals with companies hiring across industries.
                We simplify recruitment through smart candidate discovery, verified profiles and
                efficient hiring workflows.
              </p>

              <p className="text-gray-600">
                Whether you're searching for your next opportunity or hiring top talent,
                our platform helps you move faster.
              </p>


              {/* STATS */}

              <div className="mt-6 border-t pt-6 space-y-3">

                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <CheckCircle className="text-green-500" size={20}/>
                  <span>10,000+ Active Jobs</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <CheckCircle className="text-green-500" size={20}/>
                  <span>5,000+ Companies Hiring</span>
                </div>

                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <CheckCircle className="text-green-500" size={20}/>
                  <span>50,000+ Job Seekers</span>
                </div>

              </div>

            </div>


            {/* CONTACT CARD */}

            <div
              className="rounded-xl p-8 shadow text-white"
              style={{ background: gradient }}
            >

              <h2 className="text-2xl font-bold mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">

                <div className="flex gap-4">

                  <div className="bg-white/20 p-3 rounded-lg">
                    <Mail size={22}/>
                  </div>

                  <div>
                    <p className="font-semibold">Email Support</p>

                    <a
                      href="mailto:hello@sortedcv.com"
                      className="underline"
                    >
                      hello@sortedcv.com
                    </a>

                    <p className="text-sm opacity-80">
                      24/7 Email Support
                    </p>
                  </div>

                </div>


                <div className="flex gap-4">

                  <div className="bg-white/20 p-3 rounded-lg">
                    <Phone size={22}/>
                  </div>

                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-lg font-medium">
                      +91 7588800770
                    </p>

                    <p className="text-sm opacity-80">
                      Mon-Sat • 9AM-6PM
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>



          {/* CONTACT FORM */}

          <div className="bg-white rounded-xl p-8 shadow border">

            <h2 className="text-2xl font-bold mb-2">
              Send us a Message
            </h2>

            <p className="text-gray-600 mb-6">
              Fill the form and we will respond shortly.
            </p>


            {isSubmitted ? (

              <div className="text-center py-10">

                <div className="flex justify-center mb-4">
                  <CheckCircle size={40} className="text-green-500"/>
                </div>

                <h3 className="text-xl font-bold mb-2">
                  Message Sent Successfully
                </h3>

                <p className="text-gray-600">
                  Our team will contact you shortly.
                </p>

              </div>

            ) : (

              <form onSubmit={handleSubmit} className="space-y-5">


                {/* USER TYPE */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    I am a *
                  </label>

                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select</option>
                    <option value="candidate">Candidate</option>
                    <option value="employer">Employer</option>
                  </select>

                </div>


                {/* EMAIL */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Email Address *
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="example@email.com"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                  />

                </div>


                {/* PHONE */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Contact Number *
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 9876543210"
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500"
                  />

                </div>


                {/* DESCRIPTION */}

                <div>

                  <label className="block text-sm font-semibold mb-2">
                    Description *
                  </label>

                  <textarea
                    name="description"
                    rows="5"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help..."
                    className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  />

                </div>


                {/* BUTTON */}

                <button
                  type="submit"
                  className="w-full text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
                  style={{ background: gradient }}
                >
                  <Send size={18}/>
                  Submit Message
                </button>

              </form>

            )}

          </div>

        </div>

      </section>



      {/* SUPPORT STATS */}

      <section className="pb-20">

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-white p-6 rounded-xl shadow border">
            <div
              className="text-3xl font-bold mb-2 text-transparent bg-clip-text"
              style={{ backgroundImage: gradient }}
            >
              &lt; 1 Hour
            </div>
            <p className="text-gray-600">
              Average Response Time
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <div
              className="text-3xl font-bold mb-2 text-transparent bg-clip-text"
              style={{ backgroundImage: gradient }}
            >
              98%
            </div>
            <p className="text-gray-600">
              Customer Satisfaction
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow border">
            <div
              className="text-3xl font-bold mb-2 text-transparent bg-clip-text"
              style={{ backgroundImage: gradient }}
            >
              24/7
            </div>
            <p className="text-gray-600">
              Email Support
            </p>
          </div>

        </div>

      </section>

    </div>
  );
}