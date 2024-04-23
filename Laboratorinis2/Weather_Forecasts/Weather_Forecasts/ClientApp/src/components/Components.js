import styled from 'styled-components';

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
        max-width: fit-content;
    }
    td {
        white-space: nowrap;
    }
    th {
        white-space: normal;
    }
`;