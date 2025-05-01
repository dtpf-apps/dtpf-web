import { DB_DTPF_LS_NAME } from '../config';
import { StorageValid } from '../../utils/validations';
import { getIndexedDBVersionApi } from '../../api/utils';
import { message } from 'antd';

export default function setIndexedDBVersion(db: any) {
  setIdbVersion();
  const ls = localStorage.getItem(DB_DTPF_LS_NAME);
  function setIdbVersion() {
    getIndexedDBVersionApi()
      .then((res) => {
        res.indexedDBVersion && StorageValid() && localStorage.setItem(DB_DTPF_LS_NAME, ls ? res.indexedDBVersion : 1);
        if (res.indexedDBVersion === db.version + 1) {
          const reload = () => window.location.reload();
          message.info('Contenido nuevo. Actualizando la web', reload);
        }
      })
      .catch((err) => {
        message.error(err.message);
      });
  }
}
