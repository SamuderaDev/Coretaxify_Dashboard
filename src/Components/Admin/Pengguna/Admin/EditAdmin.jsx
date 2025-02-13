import React, { useState } from "react";
import "./editAdmin.css";
import TambahAdmin from "./TambahAdmin";
import Swal from "sweetalert2";
import EditPopupAdmin from "./EditPopupAdmin";
import { useMutation, useQuery } from "@tanstack/react-query";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { useCookies } from "react-cookie";
import { RoutesApi } from "@/Routes";

const EditAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState(RoutesApi.getAdmin.url);
  const [editPopupOpen, setEditPopupOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [currentPage, setCurrentPage] = useState(1);
  const [cookies, setCookie] = useCookies(["user"]);
  const itemsPerPage = 10;
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["contracts", url],
    queryFn: async () => {
      const { data } = await axios.get(url, {
        params: {
          intent: RoutesApi.getAdmin.intent,
        },
        headers: {
          Authorization: `Bearer ${cookies.token}`,
        },
      });
      console.log(data.data);
      return data;
    },
  });
  const mutationDelete = useMutation({
    mutationFn: async (id) => {
      console.log("button clicked");
      // const { response } = await axios.post(RoutesApi.login, {
      const response = await axios.get(`${RoutesApi.url}api/csrf-token`, {
        // withCredentials: true,
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
        },
      });
      console.log(response.data.token);
      axios.defaults.headers.common["X-CSRF-TOKEN"] = response.data.token;
      console.log(cookies.token);
      const data = await axios.delete(
        RoutesApi.getAdmin.url + `/${id}`,

        //   university_id: 1,
        //   contract_type: "LICENSE",
        //   qty_student: 1,
        //   start_period: "2025-02-10",
        //   end_period: "2026-02-10",
        //   spt: 5,
        //   bupot: 5,
        //   faktur: 5,
        //   contract_code: "L-0001"
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-CSRF-TOKEN": response.data.token,
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      );
      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      const role = data.data.user.roles[0].name;
      setCookie("token", data.data.token, { path: "/" });
      setCookie("role", role, { path: "/" });
      Swal.fire("Berhasil!", "Admin berhasil dihapus!", "success");

      window.location.reload();
      // alert("Login successful!");
      // queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //   const [data, setData] = useState([
  //             { id: 1, namaAdmin: "Hendra", email: "hendra@coretaxify.com", status: "Active" },
  //             { id: 2, namaAdmin: "Udin", email: "udin@coretaxify.com", status: "Expired" },
  //             { id: 3, namaAdmin: "Galeh", email: "galeh@coretaxify.com", status: "Active" },
  //   ]);

  const handleData = (newData) => {
    setData([...data, { id: data.length + 1, ...newData }]);
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setEditPopupOpen(true);
  };

  const handleUpdateAdmin = (updatedAdmin) => {
    setData(
      data.map((item) => (item.id === updatedAdmin.id ? updatedAdmin : item))
    );
    setEditPopupOpen(false);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  if (isLoading) {
    return (
      <div className="loading">
        <ClipLoader color="#7502B5" size={50} />
      </div>
      // <div className="h-full w-full text-2xl italic font-bold text-center flex items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="kontrak-container">
      <div className="header">
        <h2>Data Admin</h2>
      </div>
      <div className="search-add-container">
        <div className="search-input-container">
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Cari Data Admin 🔎"
          />
        </div>
        <button className="add-button" onClick={() => setIsOpen(true)}>
          + Tambah Admin
        </button>
      </div>

      <TambahAdmin
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleData}
      />

      {editPopupOpen && (
        <EditPopupAdmin
          isOpen={editPopupOpen}
          onClose={() => setEditPopupOpen(false)}
          admin={selectedAdmin}
          onSave={handleUpdateAdmin}
        />
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("namaAdmin")}>
                Nama Admin{" "}
                {sortConfig.key === "namaAdmin"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th onClick={() => handleSort("email")}>
                Email{" "}
                {sortConfig.key === "email"
                  ? sortConfig.direction === "ascending"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.data.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    className="action-button"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="action-button delete"
                    onClick={() => {
                      Swal.fire({
                        title: "Hapus Admin?",
                        text: "Admin akan dihapus secara permanen!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonText: "Ya, hapus!",
                        cancelButtonText: "Batal",
                        dangerMode: true,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          mutationDelete.mutate(item.id);

                          //   const newData = data.filter(
                          //     (itemData) => itemData.id !== item.id
                          //   );
                          //   setData(newData);
                        }
                      });
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination-container">
          <div className="pagination-info">
            {`Showing ${indexOfFirstItem + 1} to ${Math.min(
              indexOfLastItem,
              data.length
            )} of ${data.length} entries`}
          </div>

          <div className="pagination">
            <button
              className={`page-item`}
              onClick={() => {
                setUrl(data.links.prev);
              }}
              disabled={data.meta.current_page === 1}
            >
              &lt;
            </button>
            <button className="page-item">{data.meta.current_page}</button>
            {/* {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
                            <button key={index + 1} className={`page-item ${currentPage === index + 1 ? "active" : ""}`} onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        ))} */}
            <button
              className={`page-item ${
                currentPage === Math.ceil(data.length / itemsPerPage)
                  ? "disabled"
                  : ""
              }`}
              onClick={() => {
                console.log(data.links.next);
                setUrl(data.links.next);
              }}
              disabled={data.links.next == null}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditAdmin;
