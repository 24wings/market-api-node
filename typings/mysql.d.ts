interface MysqlMetaFieldType{
    characterSet:number;
columnLength:number;
columnType:number;
decimals:number;
encoding:string;
flags:number;
/**字段名 */
name:string;
/**二进制 */
_buf:any;
_catalogLength:number;
_catalogStart:number;

_clientEncoding:string;
_orgNameLength:number;
_orgNameStart:number;
_orgTableLength:number;
_orgTableStart:number;
_schemaLength:number;
_schemaStart:number;
_tableLength:number;
_tableStart:number;

}