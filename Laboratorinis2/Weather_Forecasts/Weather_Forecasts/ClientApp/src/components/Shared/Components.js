import styled from 'styled-components';
import Date from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const Button = styled.button`
    padding: 4px 8px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
        background-color: #0056b3;
    }
`;

export const DeleteButton = styled.button`
    padding: 4px 8px;
    border: none;
    background-color: #ff0000;
    color: white;
    cursor: pointer;
    border-radius: 8px;

    &:hover {
        background-color: #b30000;
    }
`;

export const Actions = styled.div`
    display: flex;
    gap: 10px;
    justify-content: center;
    background-color: transparent;
`;

export const Input = styled.input`
    margin: 5px 0;
    padding: 5px 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

export const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        border-bottom: 1px solid #ddd;
        padding: 4px 8px;
        text-align: left;
    }

    td {
        white-space: nowrap;
        background-color: inherit;
    }

    th {
        white-space: normal;
    }
    
    tr {
        &:hover {
            background-color: #b0d7ff;
        }
    }
`;


export const Header = styled.h1`
    margin: 0;
    padding: 10px 0 20px 0;
`;

export const ActionsContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 10px;
    background-color: transparent;
`;

export const CheckBox = styled.input`
    margin: 5px 0 0 0;
    padding: 0;
    width: 20px;
    height: 20px;
`;

export const CheckBoxContainer = styled.div`
    display: grid;
    justify-content: start;
    align-items: center;
`;

export const Select = styled.select`
    margin: 5px 0;
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

export const Label = styled.label`
    margin: 5px 0 0 0;
`;

export const DatePicker = styled(Date)`
    padding: 8px 10px;
    margin: 5px 0;
    border: 1px solid #ddd;
    border-radius: 8px;
    width: 100%;
`;