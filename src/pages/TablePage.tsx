import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../redux/userSlice';
import Pagination from '../components/pagination'; // Import the Pagination component

const TablePage: React.FC = () => {
  const user = useSelector(selectUser);
  const [tableData, setTableData] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    if (user.isLoggedIn) {
      fetchData();
    }
  }, [user.isLoggedIn, currentPage]);

  const fetchData = () => {
    let url = `https://technical-task-api.icapgroupgmbh.com/api/table/?limit=${itemsPerPage}`;

    if (currentPage > 0) {
      url += `&offset=${currentPage * itemsPerPage}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTableData(data.results);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className='table_page'>
      <h1>Table Page</h1>
      {user.isLoggedIn ? (
        <div>
          <Link to="/" className='out_action_button'>
            Logout
          </Link>
          <div className='table_action'>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item: any, index: number) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item.email}</td>
                    <td>{item.phone_number}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {tableData.length > itemsPerPage && (
              <Pagination
                pageCount={Math.ceil(tableData.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      ) : (
        <p>
          Please <Link to="/">login</Link> to access the table.
        </p>
      )}
    </div>
  );
};

export default TablePage;
