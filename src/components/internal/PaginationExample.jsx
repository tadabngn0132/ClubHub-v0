import React, { useState } from "react";
import Pagination from "./Pagination";

// Example usage component
const PaginationExample = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Example data
  const totalItems = 100;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Sample items for current page
  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return Array.from({ length: itemsPerPage }, (_, i) => ({
      id: startIndex + i + 1,
      name: `Item ${startIndex + i + 1}`,
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Optional: Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Here you would typically:
    // - Fetch new data from API
    // - Update URL query params
    // console.log('Fetching data for page:', page)
  };

  const items = getCurrentPageItems();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Pagination Example</h1>

      {/* Content */}
      <div className="grid gap-4 mb-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="font-semibold">#{item.id}</h3>
            <p className="text-gray-600">{item.name}</p>
          </div>
        ))}
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        maxVisiblePages={5} // Optional: default is 5
      />

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          Showing items {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          total items
        </p>
      </div>
    </div>
  );
};

export default PaginationExample;

/* 
=== CÁCH SỬ DỤNG ===

1. Import component:
   import Pagination from './components/internal/Pagination'

2. Setup state và logic:
   const [currentPage, setCurrentPage] = useState(1)
   const totalPages = Math.ceil(totalItems / itemsPerPage)

3. Sử dụng component:
   <Pagination
     currentPage={currentPage}
     totalPages={totalPages}
     onPageChange={(page) => setCurrentPage(page)}
     maxVisiblePages={5} // optional
   />

=== PROPS ===
- currentPage (required): Trang hiện tại (bắt đầu từ 1)
- totalPages (required): Tổng số trang
- onPageChange (required): Callback function khi đổi trang
- maxVisiblePages (optional): Số trang hiển thị tối đa (default: 5)

=== VÍ DỤ VỚI API ===

const [currentPage, setCurrentPage] = useState(1)
const [data, setData] = useState([])
const [totalPages, setTotalPages] = useState(0)

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch(`/api/items?page=${currentPage}&limit=10`)
    const result = await response.json()
    setData(result.data)
    setTotalPages(result.totalPages)
  }
  fetchData()
}, [currentPage])

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>

=== VÍ DỤ VỚI REACT ROUTER (URL PARAMS) ===

import { useSearchParams } from 'react-router-dom'

const [searchParams, setSearchParams] = useSearchParams()
const currentPage = parseInt(searchParams.get('page')) || 1

const handlePageChange = (page) => {
  setSearchParams({ page })
}

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
/>
*/
