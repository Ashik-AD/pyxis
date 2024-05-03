import { v4 as uuidV4 } from 'uuid';

const generateId = () => uuidV4().toString().replaceAll('-', '');

export default generateId;
