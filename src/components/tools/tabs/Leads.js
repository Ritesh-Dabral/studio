import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import Pagination from 'react-bootstrap/Pagination';
import { localStorageKeys } from '../../../utils/storageKeys';
import Table from 'react-bootstrap/Table';
import { leadStatus } from './config';
import styles from "../../styles/tools/tabs/Leads.module.css"
import Button from '../../common/button/Button';

export default function Leads() {

    const [leads, setLeads] = useState([]);
    const [pageData, setPageData] = useState({'page':1, 'limit':10});
    const [fetchInProgress, setFetchInProgress] = useState(false);
    const [paginationItem, setPaginationItem] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [newLeadStatus, setNewLeadStatus] = useState({});
    // const [searchMethod, setSearchMethod] = useState('contact');

    const handlePageChange = (page=1)=>{
        setPageData({...pageData, 'page': page})
    }

    const handleSearch = ()=>{
        try {
            if(!searchText || (searchText && !searchText.trim())){
                setSearchText('');
                throw Error('Enter a valid search value');
            }
            setPageData({...pageData, 'page': 1})
        }catch (error) {
            showToast(error.message, 'error');
        }
    }

    const handleClearSearch = ()=>{
        if(!searchText){
            return;
        }
        setSearchText('');
        setPageData({...pageData, 'page': 1})
    }

    const handleChangeLeadStatus = (e, contact)=>{
        setNewLeadStatus({...newLeadStatus, [contact]: e.target.value})
    }

    const showToast = (msg, type="success")=>{
        toast[type](msg, {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
    }

    const handleUpdateLead = async(contact, newStatus)=>{
        try {
            const lead = leads.find((lead)=>lead.contact === contact);
            if(lead.lead_status===newStatus){
                showToast('Please change the status before updating', 'warn');
                return;
            }

            setFetchInProgress(true);
            await axios.put(`${process.env.REACT_APP_STUDIO_BE}/lead/${contact}`,null,{
                params:{
                    'leadStatus': newStatus
                },
                timeout: 5000,
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem(localStorageKeys.TOKEN)}`
                }
            })

            showToast(`Lead status updated for contact:'${contact}'`, 'success');
        } catch (error) {
            showToast(error.message, 'error');
        }
        setFetchInProgress(false);
    }
    
    
    const fetchLeads = async ()=>{
        try {
            if(fetchInProgress){
                return; // no more data to fetch or fetching data
            }
            setFetchInProgress(true)
            let url = `${process.env.REACT_APP_STUDIO_BE}/lead`;
            if(searchText && searchText.trim()){
                url = `${process.env.REACT_APP_STUDIO_BE}/lead/${searchText}`
            }
            const resp = await axios.get(url,{
                params:{
                    'pageData': JSON.stringify(pageData)
                },
                timeout: 5000,
                headers:{
                    'Authorization': `Bearer ${localStorage.getItem(localStorageKeys.TOKEN)}`
                }
            })

            let tempLeads = []
            let tempNewLeadStatus={};
            if(resp.data.data.leads){
                resp.data.data.leads.forEach((lead)=>{
                    tempNewLeadStatus[lead.contact]=lead.lead_status;
                    tempLeads.push(lead)
                });
            }
            setLeads(tempLeads)
            setNewLeadStatus(tempNewLeadStatus)
            // set pagination
            let tempPaginationItem = [];
            for(let i=1; i<=resp.data.data.pagination.totalPages; i++){
                tempPaginationItem.push(
                    <Pagination.Item key={`pagination_items_${i}`} onClick={()=>handlePageChange(i)} active={resp.data.data.pagination.currentPage === i}>
                    {i}
                  </Pagination.Item>
                )
            }
            setPaginationItem(tempPaginationItem)
        } catch (error) {
            showToast(error.message, 'error');
        }
        setFetchInProgress(false)
    }

    useEffect(()=>{
        fetchLeads()
    }, [pageData])

    return (
        <div className='w-100 h-100'>

            <div className='m-3'>
                {/* Search */}
                <div className='d-flex mb-3'>
                    <input type='text' onChange={(e)=>setSearchText(e.target.value)} placeholder='Search contact' value={searchText} disabled={fetchInProgress}/>
                    <Button text="Search" handleClick={handleSearch} type="secondary" loading={fetchInProgress} customClassName="mx-2 w-auto"/>
                    <Button text="Clear Search" handleClick={handleClearSearch} type="secondary" loading={fetchInProgress} customClassName="mx-2 w-auto"/>
                </div>

                {/* Table */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>Contact</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Lead Status</th>
                        <th>Message</th>
                        <th>Inquiry Count</th>
                        <th>Creation Date</th>
                        <th>Updation Date</th>
                        <th>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(leads) && leads.map((_lead, index)=>{
                                return (
                                <tr key={`leads_${index}_home`}>
                                    <td className={[styles[newLeadStatus[_lead.contact]]].join(' ')}>{index+1}</td>
                                    <td className={[styles[newLeadStatus[_lead.contact]]].join(' ')}>{_lead.contact}</td>
                                    <td className={[styles[newLeadStatus[_lead.contact]]].join(' ')}>{_lead.first_name}</td>
                                    <td className={[styles[newLeadStatus[_lead.contact]]].join(' ')}>{_lead.last_name}</td>
                                    <td className={[styles[newLeadStatus[_lead.contact]]].join(' ')}>
                                        <select value={newLeadStatus[_lead.contact]} disabled={fetchInProgress} onChange={(e)=>handleChangeLeadStatus(e, _lead.contact)}>
                                            {
                                                Array.isArray(leadStatus) && leadStatus.map((_status, idx)=>{
                                                    return (
                                                        <option key={`lead_status_${idx}`} value={_status.key}>{_status.label}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td className={[styles[newLeadStatus[_lead.contact]]].join(' ')}>{_lead.lead_message}</td>
                                    <td className={[styles[newLeadStatus[_lead.contact]]].join(' ')}>{_lead.inquiry_count}</td>
                                    <td className={[styles[newLeadStatus[_lead.contact]]].join(' ')}>{new Date(_lead.createdAt).toLocaleDateString()}</td>
                                    <td className={[styles[newLeadStatus[_lead.contact]]].join(' ')}>{new Date(_lead.updatedAt).toLocaleDateString()}</td>
                                    <td className={[styles[newLeadStatus[_lead.contact]]].join(' ')}>
                                        <Button text="Update" handleClick={()=>handleUpdateLead(_lead.contact, newLeadStatus[_lead.contact])} type="secondary" loading={fetchInProgress}/>
                                    </td>
                                </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
            
            <div className='d-flex justify-content-center align-items-center mt-3'>
                <Pagination>{paginationItem}</Pagination>
            </div>
            <br />
        </div>
    )
}
