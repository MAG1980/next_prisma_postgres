import {Datagrid, List, TextField} from "react-admin";

export const GoodList = () => {
    return (
        <List>
            <Datagrid>
                <TextField source="id"/>
                <TextField source="name"/>
            </Datagrid>
        </List>
    )
}