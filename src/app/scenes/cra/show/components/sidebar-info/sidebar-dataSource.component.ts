import { CraDTO } from '@neadz/dtos';

export interface SidebarDataSource {
    data: DataObject[];

    getData(): DataObject[];
    downloadFile();
}

interface DataObject {
    title: string;
    status: number;
    date: Date;
}

export class SidebarDataSourceCra implements SidebarDataSource {
    data: DataObject[];
    dataObject: DataObject;

    constructor(public cra: CraDTO[]) { }

    getData(): DataObject[] {
        const result = [];
        for (let index = 0; index < this.cra.length; index++) {
            this.dataObject = {
                title: this.makeTitle(this.cra[index]),
                status: this.cra[index].status,
                date: this.cra[index].date,
            };
            result.push(this.dataObject);
        }
        return result;
    }

    makeTitle(cra: CraDTO): string {
        return 'Cra' + (cra.date + '').slice(4, 8) + (cra.date + '').slice(0, 4);
    }

    downloadFile() {
        console.log('download cra');
    }
}

export class SidebarDataSourceBill implements SidebarDataSource {
    data: DataObject[];

    constructor() { }

    getData() {
        const result = [];
        console.log('bill in getData() = ');
        return result;
    }

    downloadFile() {
        console.log('download facture');
    }
}

// DataSourceCra(cras: CraDTO[]): DataSource[] {
//     let result: DataSource[];
//     for (int i = 0; i < cras.length; i++) {

//     }
//     return result;
// }

// DataSourceBill(): DataSource[] {
//     const result: DataSource[] = [];
//     return result;
// }
