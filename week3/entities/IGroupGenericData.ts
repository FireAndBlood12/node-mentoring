type Permission = 'READ'|'WRITE'|'DELETE'|'SHARE'|'UPLOAD_FILES';

export default interface IGroupGenericData {
    name: string;
    permissions: Array<Permission>;
};