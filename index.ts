#! /usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";

class Student {
    static counter = 10000;
    id: string;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string) {
        this.id = String(Student.counter++);
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }

    enroll(course: string) {
        this.courses.push(course);
    }

    viewBalance() {
        console.log(chalk.green(`Balance for ${this.name}: ${this.balance}`));
    }

    payFees(amount: number) {
        this.balance -= amount;
        console.log(chalk.green(`$${amount} Fees paid successfully for ${this.name}`));
        console.log(chalk.yellow(`Remaining Balance: $${this.balance}`)); // Color the remaining balance in yellow
    }

    showStatus(){
        console.log(chalk.green(`Name: ${this.name}`));
        console.log(chalk.green(`ID: ${this.id}`));
        console.log(chalk.green(`Courses: ${this.courses}`));
        console.log(chalk.green(`Balance: ${this.balance}`));
    }
}

class StudentManager {
    students: Student[];
    
    constructor(){
        this.students = [];
    }
    
    // Method to add a new student
    addStudent(name: string){
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.green(`Student ${name} added successfully. Student ID: ${student.id}`)); // Color the success message in green       
    }
    
    // Method to enroll a student in a course 
    enrollStudent(studentId: string, course: string){
        let student = this.findStudent(studentId);
        if(student){
            student.enroll(course);
            console.log(chalk.green(`${student.name} enrolled in ${course} successfully`)); // Color the success message in green
        }
    }

    // Method to view student balance
    viewStudentBalance(studentId: string){
        let student = this.findStudent(studentId);
        if(student){
            student.viewBalance();
        } else {
            console.log(chalk.red("Student not found. Please enter a correct student ID")); // Color the error message in red
        }
    }

    // Method to pay student fees
    payStudentFees(studentId: string, amount: number){
        let student = this.findStudent(studentId);
        if(student){
            student.payFees(amount);
        } else {
            console.log(chalk.red("Student not found. Please enter a correct student ID")); // Color the error message in red
        }
    }

    // Method to display student status
    showStudentStatus(studentId: string){
        let student = this.findStudent(studentId);
        if(student){
            student.showStatus();
        } 
    }

    // Method to find a student by student_id 
    findStudent(studentId: string){
        return this.students.find(std => std.id === studentId);
    }
}

// Main function to run the program
async function main(){
    console.log(chalk.blue("Welcome to 'CodewithSohail' - Student Management System")); // Color the welcome message in blue
    console.log(chalk.cyanBright("-".repeat(60)));
    
    let studentManager = new StudentManager();

    // While loop to keep the program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Student Fees",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);

        // Using switch case to handle user choice
        switch(choice.choice) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter student name:"
                    }
                ]);
                studentManager.addStudent(nameInput.name);
                break;
                
            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "input",
                        message: "Enter student ID:"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter course name:"
                    }
                ]);
                studentManager.enrollStudent(courseInput.studentId, courseInput.course);
                break;
                
            case "View Student Balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "input",
                        message: "Enter a student ID:"
                    }
                ]);
                studentManager.viewStudentBalance(balanceInput.studentId);
                break;
                
            case "Pay Student Fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "input",
                        message: "Enter a student ID:"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter amount:"
                    }
                ]);
                studentManager.payStudentFees(feesInput.studentId, feesInput.amount);
                break;
                
            case "Show Student Status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "input",
                        message: "Enter a student ID:"
                    }
                ]);
                studentManager.showStudentStatus(statusInput.studentId);
                break;
                
            case "Exit":
                console.log(chalk.blue("Thank you for using 'CodewithSohail' - Student Management System. Exiting...")); // Color the exit message in blue
                process.exit();  
        }
    }
}

// Calling the main function
main();
