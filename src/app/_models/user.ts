export class User {
    token: string;
    role: string;
    uniqueId: string;
    employee_id: string;
    school_id: string;
    _id: string;
    users: [{
        _id: string;
        student_id: string;
        school_id: string;
        class_id: string;
        section_id: string;
        surname: string;
        first_name: string;
        last_name: string;
        gender: string;
        dob: string;
        aadhar_no: Number;
        phone: Number;
        email: string;
        category: string;
        admission_date: string;
        date: string;
        admission_no: Number
        roll_no: Number
        academic_year: string;
        bus_route_id: string;
        blood_group: string;
        father_name: string;
        father_email: string;
        studentDocuments: ""
        status: 1;
        current_address: [{
            cur_address: string;
            cur_city: string;
            cur_state: string;
            cur_pincode: string;
            cur_long: string;
            cur_lat: string;
        }];
        permanent_address: [{
            perm_address: string;
            perm_city: string;
            perm_state: string;
            perm_pincode: string;
            perm_long: string;
            perm_lat: string;
        }];
        studentImage: [{}];
        parents: [{
            parent_name: string;
            parent_contact: string;
            parent_email: string;
            parent_relation: string;
            parent_address: string;
            occupation: string;
        }]
    }]
}