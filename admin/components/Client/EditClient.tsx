import {Edit, EmailField, NumberInput, SimpleForm, TextInput} from "react-admin";
import {ItemTitle} from "@/admin/components/ItemTitle";

export const EditClient = () => {
    return (
        <Edit title={<ItemTitle recordType="Client" source="email"/>}>
            <SimpleForm>
                <TextInput source="id" disabled/>
                {/*<ReferenceInput source="userId" reference="users" />*/}
                <TextInput source="login"/>
                <TextInput source="firstName"/>
                <TextInput source="lastName"/>
                <TextInput source="phoneNumber"/>
                <TextInput source="email"/>
            </SimpleForm>
        </Edit>
    )
}