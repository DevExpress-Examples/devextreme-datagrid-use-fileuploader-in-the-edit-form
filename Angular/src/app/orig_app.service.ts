import { Injectable } from '@angular/core';

export interface Employee {
    ID: number;
    FirstName: string;
    LastName: string;
    Prefix: string;
    Position: string;
    Picture: string;
    BirthDate: string;
    HireDate: string;
    Address: string;
    StateID: number;
}

const employees: Employee[] = [{
    'ID': 1,
    'FirstName': 'John',
    'LastName': 'Heart',
    'Prefix': 'Mr.',
    'Position': 'CEO',
    'Picture': 'images/employees/01.png',
    'BirthDate': '1964/03/16',
    'HireDate': '1995/01/15',
    'Address': '351 S Hill St.',
    'StateID': 5
}, {
    'ID': 2,
    'FirstName': 'Olivia',
    'LastName': 'Peyton',
    'Prefix': 'Mrs.',
    'Position': 'Sales Assistant',
    'Picture': 'images/employees/09.png',
    'BirthDate': '1981/06/03',
    'HireDate': '2012/05/14',
    'Address': '807 W Paseo Del Mar',
    'StateID': 5
}, {
    'ID': 3,
    'FirstName': 'Robert',
    'LastName': 'Reagan',
    'Prefix': 'Mr.',
    'Position': 'CMO',
    'Picture': 'images/employees/03.png',
    'BirthDate': '1974/09/07',
    'HireDate': '2002/11/08',
    'Address': '4 Westmoreland Pl.',
    'StateID': 4
}, {
    'ID': 4,
    'FirstName': 'Greta',
    'LastName': 'Sims',
    'Prefix': 'Ms.',
    'Position': 'HR Manager',
    'Picture': 'images/employees/04.png',
    'BirthDate': '1977/11/22',
    'HireDate': '1998/04/23',
    'Address': '1700 S Grandview Dr.',
    'StateID': 11
}, {
    'ID': 5,
    'FirstName': 'Brett',
    'LastName': 'Wade',
    'Prefix': 'Mr.',
    'Position': 'IT Manager',
    'Picture': 'images/employees/05.png',
    'BirthDate': '1968/12/01',
    'HireDate': '2009/03/06',
    'Address': '1120 Old Mill Rd.',
    'StateID': 13
}, {
    'ID': 6,
    'FirstName': 'Sandra',
    'LastName': 'Johnson',
    'Prefix': 'Mrs.',
    'Position': 'Controller',
    'Picture': 'images/employees/06.png',
    'BirthDate': '1974/11/15',
    'HireDate': '2005/05/11',
    'Address': '4600 N Virginia Rd.',
    'StateID': 44
}, {
    'ID': 7,
    'FirstName': 'Kevin',
    'LastName': 'Carter',
    'Prefix': 'Mr.',
    'Position': 'Shipping Manager',
    'Picture': 'images/employees/07.png',
    'BirthDate': '1978/01/09',
    'HireDate': '2009/08/11',
    'Address': '424 N Main St.',
    'StateID': 5
}, {
    'ID': 8,
    'FirstName': 'Cynthia',
    'LastName': 'Stanwick',
    'Prefix': 'Ms.',
    'Position': 'HR Assistant',
    'Picture': 'images/employees/08.png',
    'BirthDate': '1985/06/05',
    'HireDate': '2008/03/24',
    'Address': '2211 Bonita Dr.',
    'StateID': 4
}, {
    'ID': 9,
    'FirstName': 'Kent',
    'LastName': 'Samuelson',
    'Prefix': 'Dr.',
    'Position': 'Ombudsman',
    'Picture': 'images/employees/02.png',
    'BirthDate': '1972/09/11',
    'HireDate': '2009/04/22',
    'Address': '12100 Mora Dr',
    'StateID': 26
}];

@Injectable()
export class Service {
    getEmployees() {
        return employees;
    }
}
