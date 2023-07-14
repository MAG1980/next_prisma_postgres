import {Edit, NumberInput, ReferenceInput, SimpleForm, TextInput} from "react-admin";

export const EditGoodsImage = () => {
    return (
        <Edit>
            <SimpleForm>
                <TextInput source="id" disabled />
                {/*<ReferenceInput source="userId" reference="users" />*/}
                <ReferenceInput source="goodId" reference="goods"/>
                <TextInput source="link" type="url"/>
                <NumberInput source="fileSize"/>
            </SimpleForm>
        </Edit>
    )
}