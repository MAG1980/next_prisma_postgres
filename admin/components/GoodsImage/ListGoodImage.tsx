import {
    Datagrid,
    List,
    ReferenceField,
    NumberField,
    DateField,
    TextField,
    ReferenceInput,
    TextInput
} from "react-admin";

const imageFilters = [
    <TextInput source="link" label="Search" alwaysOn/>,
    <ReferenceInput source="goodId" label="Good" reference="goods"/>,
];
export const ListGoodImage = () => {
    return (
        <List filters={imageFilters}>
            <Datagrid>
                <Datagrid rowClick="edit">
                    <TextField source="id"/>
                    <ReferenceField source="goodId" reference="goods"/>
                    <TextField source="link"/>
                    <NumberField source="fileSize"/>
                    <DateField source="createdAt"/>
                </Datagrid>
            </Datagrid>
        </List>
    )
}