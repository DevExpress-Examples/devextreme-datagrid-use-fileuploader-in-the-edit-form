using System;
using System.Collections.Generic;

namespace ASP_NET_Core.Models;

static class SampleData
{
    public static List<Employee> Employees =
    [
        new Employee
        {
            ID = 1,
            FirstName = "John",
            LastName = "Heart",
            Prefix = "Mr.",
            Position = "CEO",
            Picture = "images/employees/01.png",
            BirthDate = new DateTime(1964, 3, 16),
            HireDate = new DateTime(1995, 1, 15),
            Notes = "John has been in the Audio/Video industry since 1990. He has led DevAv as its CEO since 2003.\r\n\r\nWhen not working hard as the CEO, John loves to golf and bowl. He once bowled a perfect game of 300.",
            Address = "351 S Hill St."
        },
        new Employee
        {
            ID = 20,
            FirstName = "Olivia",
            LastName = "Peyton",
            Prefix = "Mrs.",
            Position = "Sales Assistant",
            Picture = "images/employees/09.png",
            BirthDate = new DateTime(1981, 6, 3),
            HireDate = new DateTime(2012, 5, 14),
            Notes = "Olivia loves to sell. She has been selling DevAV products since 2012. \r\n\r\nOlivia was homecoming queen in high school. She is expecting her first child in 6 months. Good Luck Olivia.",
            Address = "807 W Paseo Del Mar"
        },
        new Employee
        {
            ID = 4,
            FirstName = "Robert",
            LastName = "Reagan",
            Prefix = "Mr.",
            Position = "CMO",
            Picture = "images/employees/03.png",
            BirthDate = new DateTime(1974, 9, 7),
            HireDate = new DateTime(2002, 11, 8),
            Notes = "Robert was recently voted the CMO of the year by CMO Magazine. He is a proud member of the DevAV Management Team.\r\n\r\nRobert is a championship BBQ chef, so when you get the chance ask him for his secret recipe.",
            Address = "4 Westmoreland Pl."
        },
        new Employee
        {
            ID = 5,
            FirstName = "Greta",
            LastName = "Sims",
            Prefix = "Ms.",
            Position = "HR Manager",
            Picture = "images/employees/04.png",
            BirthDate = new DateTime(1977, 11, 22),
            HireDate = new DateTime(1998, 4, 23),
            Notes = "Greta has been DevAV's HR Manager since 2003. She joined DevAV from Sonee Corp.\r\n\r\nGreta is currently training for the NYC marathon. Her best marathon time is 4 hours. Go Greta.",
            Address = "1700 S Grandview Dr."
        },
        new Employee
        {
            ID = 6,
            FirstName = "Brett",
            LastName = "Wade",
            Prefix = "Mr.",
            Position = "IT Manager",
            Picture = "images/employees/05.png",
            BirthDate = new DateTime(1968, 12, 1),
            HireDate = new DateTime(2009, 3, 6),
            Notes = "Brett came to DevAv from Microsoft and has led our IT department since 2012.\r\n\r\nWhen he is not working hard for DevAV, he coaches Little League (he was a high school pitcher).",
            Address = "1120 Old Mill Rd."
        },
        new Employee
        {
            ID = 7,
            FirstName = "Sandra",
            LastName = "Johnson",
            Prefix = "Mrs.",
            Position = "Controller",
            Picture = "images/employees/06.png",
            BirthDate = new DateTime(1974, 11, 15),
            HireDate = new DateTime(2005, 5, 11),
            Notes = "Sandra is a CPA and has been our controller since 2008. She loves to interact with staff so if you've not met her, be certain to say hi.\r\n\r\nSandra has 2 daughters both of whom are accomplished gymnasts.",
            Address = "4600 N Virginia Rd."
        },
        new Employee
        {
            ID = 10,
            FirstName = "Kevin",
            LastName = "Carter",
            Prefix = "Mr.",
            Position = "Shipping Manager",
            Picture = "images/employees/07.png",
            BirthDate = new DateTime(1978, 1, 9),
            HireDate = new DateTime(2009, 8, 11),
            Notes = "Kevin is our hard-working shipping manager and has been helping that department work like clockwork for 18 months.\r\n\r\nWhen not in the office, he is usually on the basketball court playing pick-up games.",
            Address = "424 N Main St."
        },
        new Employee
        {
            ID = 11,
            FirstName = "Cynthia",
            LastName = "Stanwick",
            Prefix = "Ms.",
            Position = "HR Assistant",
            Picture = "images/employees/08.png",
            BirthDate = new DateTime(1985, 6, 5),
            HireDate = new DateTime(2008, 3, 24),
            Notes = "Cindy joined us in 2008 and has been in the HR department for 2 years. \r\n\r\nShe was recently awarded employee of the month. Way to go Cindy!",
            Address = "2211 Bonita Dr."
        },
        new Employee
        {
            ID = 30,
            FirstName = "Kent",
            LastName = "Samuelson",
            Prefix = "Dr.",
            Position = "Ombudsman",
            Picture = "images/employees/02.png",
            BirthDate = new DateTime(1972, 9, 11),
            HireDate = new DateTime(2009, 4, 22),
            Notes = "As our ombudsman, Kent is on the front-lines solving customer problems and helping our partners address issues out in the field. He is a classically trained musician and is a member of the Chamber Orchestra.",
            Address = "12100 Mora Dr"
        }
    ];
}
