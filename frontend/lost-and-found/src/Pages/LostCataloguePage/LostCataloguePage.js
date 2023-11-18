import React, { useState, useEffect, useMemo } from 'react';
import { API_URL } from '../../config/api-end-points';
import sensitiveImg from '../../Assets/Images/sensitive.jpg';
import noImg from '../../Assets/Images/No-Image-Placeholder.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Navbar from '../../Components/Navbar';
import { ApiRequest } from '../../helpers/api-request';
import FilterOptions from '../../Components/FilterOptions';

const LostCatalogue = () => {
  const [isFilterOpen, setFilterOpen] = useState(true);
  const [items, setItems] = useState([]);
  const toggleFilter = () => setFilterOpen(!isFilterOpen);
  const BaseColor = '#75e6a3';

  const containerFlexStyle = {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
  };

  const componentAStyle = {
    flex: '1',
    padding: '16px',
    border: '2px solid #000',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
    padding: '20px',
    borderBottom: 'none',
  };

  const componentBStyle = {
    flex: '3',
    padding: '16px',
  };

  const cardStyle = {
    background: '#fff',
    borderRadius: '8px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    transition: 'transform 0.2s',
    cursor: 'pointer',
    overflow: 'hidden',
  };

  const cardHoverStyle = {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  };

  const imageStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '8px',
    objectFit: 'cover',
  };

  const itemInfoStyle = {
    flex: '1',
    marginLeft: '16px',
    textAlign: 'center',
  };

  const itemNameStyle = {
    color: '#333',
    fontSize: '20px',
    margin: '0',
  };

  const itemTextStyle = {
    color: '#333',
    fontSize: '15px',
    margin: '4px 0',
  };

  const defaultImageStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '8px',
    objectFit: 'cover',
    background: '#f0f0f0',
  };

  const buttonStyle = {
    backgroundColor: '#35ac65',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    cursor: 'pointer',
  };

  const itemContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  };

  const filterContainerStyle = {
    width: '100%',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
  };

  const filterOptionsStyle = {
    width: '100%',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '8px',
    margin: '8px 0',
  };

  const filterButtonStyle = {
    backgroundColor: BaseColor,
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    margin: '8px 0',
    cursor: 'pointer',
  };

  const clearButtonStyle = {
    backgroundColor: '#cf534e',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    margin: '8px 0',
    cursor: 'pointer',
  };

  const filterLabelStyle = {
    width: '75%',
    background: BaseColor,
    color: '#fff',
    fontSize: '20px',
    padding: '5px 0',
    textAlign: 'center',
    cursor: 'pointer',
  };

  const filterLabelContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
  };

  const filterOptionsContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  const userEmail = localStorage.getItem('user_email');
  const handleClaimRequest = (itemId) =>{
    ApiRequest.fetch({
      method: 'put',
      url: `${API_URL}/api/v1/items/claims/request`,
      params: {
        itemId: itemId,
        userId: userEmail,
      },   
    }, false)
      .then((data) => {
        toast.success('Claim Request Raised Successfully!', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
      });

      })
      .catch((e) => {
        console.log("error",e);
      });
  }

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedItems, setPaginatedItems] = useState([]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchData(newPage);
  };

  const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const visiblePages = 10;
    const totalSets = Math.ceil(totalPages / visiblePages);
    const currentSet = Math.ceil(currentPage / visiblePages);

    const renderPaginationButtons = () => {
      const buttons = [];

      const startPage = (currentSet - 1) * visiblePages + 1;
      const endPage = Math.min(currentSet * visiblePages, totalPages);

      for (let page = startPage; page <= endPage; page++) {
        buttons.push(
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              backgroundColor: currentPage === page ? BaseColor : 'transparent',
              color: currentPage === page ? '#fff' : BaseColor,
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              margin: '4px',
              cursor: 'pointer',
            }}>
            {page}
          </button>
        );
      }

      return buttons;
    };



    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {currentSet > 1 && (
          <button
            onClick={() => handlePageChange((currentSet - 1) * visiblePages)}
            style={{
              backgroundColor: BaseColor,
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              margin: '4px',
              cursor: 'pointer',
            }}>
            {'<<'}
          </button>
        )}
        {renderPaginationButtons()}
        {currentSet < totalSets && (
          <button
            onClick={() => handlePageChange(currentSet * visiblePages + 1)}
            style={{
              backgroundColor: BaseColor,
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              padding: '8px 16px',
              margin: '4px',
              cursor: 'pointer',
            }}>
            {'>>'}
          </button>
        )}
      </div>
    );
  };

  const renderPagination = () => {
    return (
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    );
  };

  const ItemCard = ({ item }) => {
    const { title, image, postedAt, location, sensitive, description,id,claimRequested } = item;

    const renderItemImage = () => {
      if (sensitive) {
        return <img src={sensitiveImg} alt="Default" style={defaultImageStyle} />;
      } else {
        if (!image) {
          return <img src={noImg} alt="Default" style={defaultImageStyle} />;
        } else {
          return <img src={image[0]} alt={title} style={imageStyle} />;
        }
      }
    };

    const [isHovered, setHovered] = useState(false);

    const cardContentStyle = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
    };

    return (
      <div
        style={{
          ...cardStyle,
          width: 'calc(33.33% - 2.5%)',
          margin: '1.25%',
          ...(isHovered && cardHoverStyle),
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}>
        <div style={cardContentStyle}>
          <div style={{ textAlign: 'center' }}>{renderItemImage()}</div>
          <div style={itemInfoStyle}>
            <h3 style={itemNameStyle}>{title}</h3>
            <p style={itemTextStyle}>Posted at: {new Date(postedAt).toLocaleDateString("en-CA")}</p>
            <p style={itemTextStyle}>Description: {description}</p>
          </div>
          {<button onClick={() => {handleClaimRequest(id)}} style={buttonStyle}>Claim</button>}
        </div>
      </div>
    );
  };

  const ItemList = ({ items }) => {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
        {items?.map((item, index) => (
          <ItemCard key={index} item={item} />
        ))}
      </div>
    );
  };

  const [totalPages, setTotalPages] = useState(0);

  const fetchData = (page = 1, filterParams = {}) => {
    const requestBody = {
      filters: {
        foundItem: {
          value: true,
          mode: 'equals',
        },
        ...filterParams,
      },
      page: page - 1,
      size: itemsPerPage,
      sortField: 'postedAt',
      sortDirection: 'DESC',
    };

    ApiRequest.fetch({
      method: 'post',
      url: `${API_URL}/api/v1/items/search`,
      data: requestBody,
    })
      .then((data) => {
        setItems(data.content);
        setTotalPages(data.totalPages);
        setPaginatedItems(data.content);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    fetchData();
  }, []);

  const MemoizedItemList = useMemo(() => {
    return <ItemList items={paginatedItems} />;
  }, [paginatedItems]);

  const applyFilter = (filterParams) => {
    fetchData(1, filterParams);
  };

  return (
    <div>
      <div style={containerFlexStyle}>
        <div style={componentAStyle}>
          <div style={filterLabelContainerStyle}>
            <div
              style={filterLabelStyle}
              className="filter-toggle"
              onClick={toggleFilter}>
              {isFilterOpen ? 'Hide Filter Options' : 'Show Filter Options'}
            </div>
          </div>
          {isFilterOpen && (
            <div style={filterOptionsContainerStyle}>
              <FilterOptions applyFilter={applyFilter} />
            </div>
          )}
        </div>
        <div style={componentBStyle}>
          <h1 style={{ textAlign: 'center', fontSize: '40px', color: '#333' }}>
            LOST CATALOGUE:
          </h1>
          {MemoizedItemList}
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default LostCatalogue;
