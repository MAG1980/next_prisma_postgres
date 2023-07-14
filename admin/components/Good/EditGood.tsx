import {Edit, NumberInput, SimpleForm, TextInput} from "react-admin";

export const EditGood = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" disabled />
                {/*<ReferenceInput source="userId" reference="users" />*/}
                <TextInput source="name"/>
                <NumberInput source="basePrice"/>
                <TextInput source="ingredients"/>
                <TextInput source="description" multiline rows={3}/>
            </SimpleForm>
        </Edit>
    )
}