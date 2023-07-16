import {useRecordContext} from "react-admin";

export const ItemTitle = ({recordType, source}: { recordType: string, source: string }) => {
    const record = useRecordContext();

    return <span>{recordType}: {record ? `"${record[source]}"` : ''}</span>

}