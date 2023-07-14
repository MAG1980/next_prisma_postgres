import {Datagrid, DeleteButton, EditButton, List, TextField} from "react-admin";

export const ListGood = () => {
    return (
        <List>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="name"/>
                <TextField source="description"/>
            </Datagrid>
        </List>
    )
}