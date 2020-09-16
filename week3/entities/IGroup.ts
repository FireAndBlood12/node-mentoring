type Permission = 'READ'|'WRITE'|'DELETE'|'SHARE'|'UPLOAD_FILES';

export default interface IGroup {
    id: number;
    name: string;
    permissions: Array<Permission>;
};
