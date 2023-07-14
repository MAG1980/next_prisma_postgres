import {Edit, EmailField, NumberInput, SimpleForm, TextInput} from "react-admin";

export const EditClient = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" disabled />
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