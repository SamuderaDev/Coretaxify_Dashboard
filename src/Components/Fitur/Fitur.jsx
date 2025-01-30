import React, { useEffect } from "react";
import "./fitur.css";
import featureImage from "../../Assets/image/img1.png"; // Ganti dengan path gambar Anda
import aos from "aos";

const Fitur = () => {


  useEffect(() => {
    aos.init({ duration: 2000 });
  }, []);

  const features = [
    {
      title: "E-Faktur",
      points: [
        "Faktur Masukan",
        "Faktur Keluaran",
        "Retur Pajak Keluaran",
        "Retur Pajak Masukan",
      ],
    },
    {
      title: "E-Bupot",
      points: [
        "Bupot Unifikasi",
        "BPNR",
        "Penyetoran Sendiri",
        "Pemotongan Secara Di Gunggung",
        "Bupot 21",
        "Bupot 26",
        "Bupot A1",
        "Bupot A2",
      ],
    },
    {
      title: "SPT",
      points: [
        "Pelaporan SPT",
        "Pencatatan Pembukuan SPT",
        "Dasar Kompensasi",
        "Mengunggah ketidakberesan SPT",
      ],
    },
    {
      title: "Pembayaran",
      points: [
        "Permohonan Pemindah Buku",
        "Layaran Mandiri Kode Billing",
        "Pembuatan Kode Billing atas Tagihan Pajak",
        "Daftar Kode Billing belum dibayar",
        "Formulir Restitusi Pajak",
        "Permohonan Pemberian Imbalan Bunga",
        "Permohonan PPh DTP atas penghasilan PDAM",
      ],
    },
    {
      title: "Buku Besar",
      points: [
        "Mencatat seluruh transaksi yang berkaitan dengan wajib pajak baik dari sisi debit maupun sisi kredit",
      ],
    },
  ];

  return (
    <div className="fitur-container">
      <h1 className="fitur-title" data-aos="fade-up" data-aos-duration="1500">Fitur Coretaxify</h1>
      <div className="fitur-grid" data-aos="fade-up" >
        {features.map((feature, index) => (
          <div className="fitur-card" key={index}>
            <img
              src={featureImage}
              alt={feature.title}
              className="fitur-image"
            />
            <div className="fitur-content">
              <h2 className="fitur-card-title">{feature.title}</h2>
              <ol className="fitur-points">
                {feature.points.map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Fitur;
