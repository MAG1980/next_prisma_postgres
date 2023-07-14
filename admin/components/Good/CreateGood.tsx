import {Create, NumberInput, SimpleForm, TextInput} from "react-admin";

export const CreateGood = () => {
    return (
        <Create>
            <SimpleForm>
                {/*<ReferenceInput source="userId" reference="users" />*/}
                <TextInput source="name"/>
                <NumberInput source="basePrice"/>
                <TextInput source="ingredients"/>
                <TextInput source="description" multiline rows={3}/>
            </SimpleForm>
        </Create>
    )
}