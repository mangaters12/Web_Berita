import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function Dashboard(props) {
  const { auth, myNews } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [isNotif, setIsNotif] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("category", category);
    data.append("image", image);

    Inertia.post("/news", data)
      .then((response) => {
        // Handle response if needed
        console.log("Response:", response);
        setIsNotif(true);
        setTitle("");
        setDescription("");
        setCategory("");
        setImage(null);
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error:", error);
      });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  useEffect(() => {
    if (!myNews) {
      Inertia.get("/news");
    }
    console.log("props", props);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="p-6 bg-white border-b border-gray-200">
            {isNotif && (
              <div className="alert alert-info">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-current shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>{props.flash.message}</span>
              </div>
            )}
            <div className="text-gray-900">
              <input
                type="text"
                placeholder="judul"
                className="input input-bordered w-full m-2 bg-white"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <input
                type="text"
                placeholder="deskripsi"
                className="input input-bordered w-full m-2 bg-white"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <input
                type="text"
                placeholder="kategory"
                className="input input-bordered w-full m-2 bg-white"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              />
              <button
                className="btn bg-primary m-2"
                onClick={() => handleSubmit()}
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-4"} sm:grid-cols-2 md:grid-cols-3 gap-4`}>
            {props.myNews && props.myNews.length > 0 ? (
              myNews.map((news, i) => {
                return (
                  <div
                    key={i}
                    className={`card bg-white w-full ${isMobile ? "" : "bg-base-100"} shadow-xl`}
                  >
                    <div className="card-body">
                      <h2 className="card-title">
                        {news.title}
                        <div className="badge badge-secondary">NEW</div>
                      </h2>
                      <p>{news.description}</p>
                      <div className="card-actions justify-end">
                        <div className="badge badge-primary">{news.category}</div>
                        <div className="badge badge-outline">
                          <button>Edit</button>
                        </div>
                        <div className="badge badge-outline">
                          <button>Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p>Kamu belum ada berita</p>
            )}
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
