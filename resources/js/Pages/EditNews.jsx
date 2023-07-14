import { Link, Head } from "@inertiajs/react";
import React from "react";
import Navbar from "@/Components/Navbar";
import { useState } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function EditNews(props) {
    // const { auth, myNews } = props;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");


    const handleSubmit = () => {
        const data = {
            id: props.myNews.id,
            title,
            description,
            category,
        }

        Inertia.post("/news/update", data)
        //     .then((response) => {
        //         // Handle response if needed
        //         console.log("Response:", response)
                setIsNotif(true);
                setTitle("");
                setDescription("");
                setCategory("");
            // })
            // .catch((error) => {
            //     // Handle error if needed
            //     console.error("Error:", error)
            // })
    }

    console.log("props", props);
    return (
<div className="flex justify-center items-center min-h-screen bg-slate-50">
    {/* <Head title={props.title} />
            <Navbar user={props.auth.user} /> */}
  <div className="card bg-white w-full lg:w-96 bg-base-100 shadow-xl m-2">
    <div className="p-4 text-2xl">EDIT BERITA</div>
    <div className="card-body">
      <input
        type="text"
        placeholder="judul"
        className="input input-bordered w-full m-2 bg-white"
        onChange={(title) => setTitle(title.target.value)}
        defaultValue={props.myNews.title}
      />
      <input
        type="text"
        placeholder="deskripsi"
        className="input input-bordered w-full m-2 bg-white"
        onChange={(description) => setDescription(description.target.value)}
        defaultValue={props.myNews.description}
      />
      <input
        type="text"
        placeholder="kategori"
        className="input input-bordered w-full m-2 bg-white"
        onChange={(category) => setCategory(category.target.value)}
        defaultValue={props.myNews.category}
      />
      <button className="btn bg-primary m-2" onClick={() => handleSubmit()}>
        UPDATE
      </button>

      <button className="btn bg-primary m-2" onClick={() => Inertia.visit(route('dashboard'))}>
        Kembali ke Dashboard
        </button>

    </div>
  </div>
</div>

    );
}
