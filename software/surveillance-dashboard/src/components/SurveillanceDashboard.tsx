// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { UploadCloud, MapPin } from "lucide-react";

// export default function SurveillanceDashboard() {
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/reports/", {
//       headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
//     })
//       .then(response => response.json())
//       .then(data => setReports(data));
//   }, []);

//   const handleImageUpload = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const formData = new FormData();
//       formData.append("image", file);
//       const response = await fetch("http://localhost:8000/api/upload/", {
//         method: "POST",
//         body: formData,
//         headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
//       });
//       const data = await response.json();
//       setReports([...reports, { image: data.image_url, status: "Pending Review" }]);
//     }
//   };

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-xl font-bold mb-4">Illegal Mining Surveillance Dashboard</h1>
//       <div className="mb-4">
//         <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="imageUpload" />
//         <label htmlFor="imageUpload" className="cursor-pointer flex items-center gap-2 text-blue-600">
//           <UploadCloud /> Upload Surveillance Image
//         </label>
//       </div>
//       <h2 className="text-lg font-semibold mt-6 mb-2">Reported Cases</h2>
//       <div className="space-y-4">
//         {reports.map((report, index) => (
//           <Card key={index} className="p-4 border">
//             <CardContent>
//               <img src={report.image} alt="Reported" className="w-full h-32 object-cover rounded" />
//               <p className="mt-2 text-sm flex items-center gap-1"><MapPin /> Status: {report.status}</p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState, useEffect } from "react";
import { UploadCloud, MapPin } from "lucide-react";
import Card from "./ui/Card";
import Button from "./ui/Button";

interface Report {
    image: string;
    status: string;
}

const SurveillanceDashboard: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/reports/", {
            headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
        })
        .then(response => response.json())
        .then(data => setReports(data));
    }, []);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const formData = new FormData();
            formData.append("image", file);
            const response = await fetch("http://localhost:8000/api/upload/", {
                method: "POST",
                body: formData,
                headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
            });
            const data = await response.json();
            setReports([...reports, { image: data.image_url, status: "Pending Review" }]);
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Illegal Mining Surveillance Dashboard</h1>
            <div className="mb-4">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="imageUpload"
                />
                <label htmlFor="imageUpload" className="cursor-pointer flex items-center gap-2 text-blue-600">
                    <UploadCloud /> Upload Surveillance Image
                </label>
            </div>
            <h2 className="text-lg font-semibold mt-6 mb-2">Reported Cases</h2>
            <div className="space-y-4">
                {reports.map((report, index) => (
                    <Card key={index} className="p-4">
                        <img src={report.image} alt="Reported" className="w-full h-32 object-cover rounded" />
                        <p className="mt-2 text-sm flex items-center gap-1">
                            <MapPin /> Status: {report.status}
                        </p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default SurveillanceDashboard;
