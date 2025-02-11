import React, { useState } from "react";
import icon_class from "../../../Assets/image/class_icon.png";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useCookies } from "react-cookie";
import { LuClock } from "react-icons/lu";

export default function MahsiswaKelas() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false); // State untuk popup tambah kelas
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [selectedData, setSelectedData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [cookies, setCookie] = useCookies(["user"]);

  const [data, setData] = useState([
    {
      id: "1",
      nama: "Kelas Poltek",
      kodeKelas: "xAE12",
      isSelected: false,
    },
    {
      id: "2",
      nama: "Kelas UB",
      kodeKelas: "xAE12",
      isSelected: false,
    },
    {
      id: "3",
      nama: "Kelas UM",
      kodeKelas: "xAE12",
      isSelected: false,
    },
    {
      id: "4",
      nama: "Kelas UGM",
      kodeKelas: "xAE12",
      isSelected: false,
    },
  ]);

  const [formData, setFormData] = useState({
    nama: "",
    kodeKelas: "",
  });

  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const newKelas = {
      id: String(data.length + 1),
      nama: formData.nama,
      kodeKelas: formData.kodeKelas,
      isSelected: false,
    };
    setData([...data, newKelas]);
    setIsAddOpen(false);
    setFormData({ nama: "", kodeKelas: "" });
  };

  const handleReloadCode = () => {
    setFormData({ ...formData, kodeKelas: generateRandomCode() });
  };

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
    setData(sortedData);
  };

  const handleEditClick = (index) => {
    setSelectedData(data[index]);
    setIsOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [search, setSearch] = useState("");

  const processedData = data.map((item) => ({
    ...item,
    highlight:
      search &&
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      ),
  }));

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Kelas</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Kelas   🔎"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 w-full gap-5">
        <div className="shadow-md border-2 rounded-md min-h-64 flex flex-col relative bg-white">
          <div className="w-full bg-purple-500 h-fit rounded-t-md p-6 text-white flex justify-between">
            <div className="">
              <h3 className="text-xl font-bold">KELAS A</h3>
              <h4 className="text-lg">Kode Kelas</h4>
            </div>
            <div className="">
              <BsThreeDotsVertical className="text-2xl" />
            </div>
          </div>
          <div className="z-10 top-16 left-64 absolute">
            <img src={icon_class} alt="" className="w-24" />
          </div>
          <div className="w-full p-5 h-[8.5rem] border-b-2 border-black">
            <h4 className="text-lg font-bold">- PT Cakra </h4>
            <p className="text-sm">Deadline Dec 27, 2024</p>
          </div>
          <div className="w-full p-2 pl-3 py-5 flex items-center gap-3 ">
            <LuClock className="text-2xl" />
            <p className="text-sm ">
              <span className="font-bold">Kelas dibuat pada : </span>
              August, 27 2024
            </p>
          </div>
        </div>

        <div className="shadow-md border-2 rounded-md min-h-64 flex flex-col relative bg-white">
          <div className="w-full bg-purple-500 h-fit rounded-t-md p-6 text-white flex justify-between">
            <div className="">
              <h3 className="text-xl font-bold">KELAS A</h3>
              <h4 className="text-lg">Kode Kelas</h4>
            </div>
            <div className="">
              <BsThreeDotsVertical className="text-2xl" />
            </div>
          </div>
          <div className="z-10 top-16 left-64 absolute">
            <img src={icon_class} alt="" className="w-24" />
          </div>
          <div className="w-full p-5 h-[8.5rem] border-b-2 border-black">
            <h4 className="text-lg font-bold">- PT Cakra </h4>
            <p className="text-sm">Deadline Dec 27, 2024</p>
          </div>
          <div className="w-full p-2 pl-3 py-5 flex items-center gap-3 ">
            <LuClock className="text-2xl" />
            <p className="text-sm ">
              <span className="font-bold">Kelas dibuat pada : </span>
              August, 27 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
