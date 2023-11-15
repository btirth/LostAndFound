import React from 'react'
import { Alert } from 'react-bootstrap'
import { X } from 'react-bootstrap-icons'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import {ItemType} from "../constants/ItemType";

const FilterPanel = () => { return(

    <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={ItemType.LostItem}
    label="Select Type of Item"
  >
    <MenuItem value={ItemType.LostItem}>Lost Item</MenuItem>
    <MenuItem value={ItemType.FoundItem}>Found Item</MenuItem>
  </Select>
    
)
}

export default FilterPanel