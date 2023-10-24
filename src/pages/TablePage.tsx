import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUser } from '../redux/userSlice';

const TablePage: React.FC = () => {
  const user = useSelector(selectUser);
  const [tableData, setTableData] = useState<any[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (user.isLoggedIn) {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => response.json())
        .then((data) => {
          setTableData(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }
  }, [user.isLoggedIn]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);



  const handleNextPage = () => {
    if (currentPage < Math.ceil(tableData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const jumpToPage = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(tableData.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className='table_action'>
      <h1>Table Page</h1>
      {user.isLoggedIn ? (
        <div>
          <Link to="/" className='out_action_button'>Logout</Link>
          <div className='table_action'>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>{item.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {tableData.length > itemsPerPage && (
            <div>
              <ul className="pagination">
                <li>
                  <button onClick={handlePrevPage} disabled={currentPage === 1}>
                    Previous
                  </button>
                </li>
                {Array.from({ length: Math.ceil(tableData.length / itemsPerPage) }, (_, index) => (
                    <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                        <button onClick={() => jumpToPage(index + 1)}>{index + 1}</button>
                    </li>
                    ))}
                <li>
                  <button onClick={handleNextPage} disabled={currentPage === Math.ceil(tableData.length / itemsPerPage)}>
                    Next
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Please <Link to="/">login</Link> to access the table.</p>
      )}
    </div>
  );
};

export default TablePage;
