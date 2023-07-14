import {Create, EmailField, NumberInput, SimpleForm, TextInput} from "react-admin";

export const CreateClient = () => {
    return (
        <Create>
            <SimpleForm>
                {/*<ReferenceInput source="userId" reference="users" />*/}
                <TextInput source="login"/>
                <TextInput source="firstName"/>
                <TextInput source="lastName"/>
                <TextInput source="phoneNumber"/>
                <TextInput source="email" type="email"/>
            </SimpleForm>
        </Create>
    )
}