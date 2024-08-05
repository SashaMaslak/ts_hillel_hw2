enum Position {
  PROFESSOR = "Professor",
  ASSISTANT_PROFESSOR = "Assistant Professor",
  LECTURER = "Lecturer",
  OTHER = "Other",
}

enum GroupStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
}

interface Lecturer {
  name: string
  surname: string
  position: Position
  company: string
  experience: number
  courses: string[]
  contacts: { email?: string; phone?: string }
}

class Area {
  private _levels: Level[] = []
  private _name: string

  constructor(name: string) {
    this._name = name
  }

  get name(): string {
    return this._name
  }

  get levels(): Level[] {
    return this._levels
  }

  addLevel(level: Level): void {
    if (level instanceof Level) {
      this._levels.push(level)
    }
  }

  removeLevel(level: Level): void {
    this._levels = this._levels.filter(l => l !== level)
  }
}

class Level {
  private _groups: Group[] = []
  private _name: string
  private _description: string

  constructor(name: string, description: string) {
    this._name = name
    this._description = description
  }

  get name(): string {
    return this._name
  }

  get description(): string {
    return this._description
  }

  get groups(): Group[] {
    return this._groups
  }

  addGroup(group: Group): void {
    if (group instanceof Group) {
      this._groups.push(group)
    }
  }

  removeGroup(group: Group): void {
    this._groups = this._groups.filter(g => g !== group)
  }
}

class Group {
  private _area?: Area
  private _status: GroupStatus = GroupStatus.ACTIVE
  private _students: Student[] = []

  directionName: string
  levelName: string

  constructor(directionName: string, levelName: string) {
    this.directionName = directionName
    this.levelName = levelName
  }

  get area(): Area | undefined {
    return this._area
  }

  set area(value: Area | undefined) {
    this._area = value
  }

  get status(): GroupStatus {
    return this._status
  }

  set status(value: GroupStatus) {
    this._status = value
  }

  get students(): Student[] {
    return this._students
  }

  addStudent(student: Student): void {
    if (student instanceof Student) {
      this._students.push(student)
    }
  }

  removeStudent(student: Student): void {
    this._students = this._students.filter(s => s !== student)
  }

  showPerformance(): Student[] {
    return this._students.sort(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    )
  }
}

class Student {
  private _firstName: string
  private _lastName: string
  private _birthYear: number
  private _grades: number[] = []
  private _visits: boolean[] = []

  constructor(firstName: string, lastName: string, birthYear: number) {
    this._firstName = firstName
    this._lastName = lastName
    this._birthYear = birthYear
  }

  get fullName(): string {
    return `${this._lastName} ${this._firstName}`
  }

  set fullName(value: string) {
    ;[this._lastName, this._firstName] = value.split(" ")
  }

  get age(): number {
    return new Date().getFullYear() - this._birthYear
  }

  getPerformanceRating(): number {
    const gradeValues = Object.values(this._grades)

    if (gradeValues.length === 0) return 0

    const totalMarks = this._grades.reduce((sum, grade) => sum + grade, 0)
    const averageGrade = totalMarks / this._grades.length

    const attendancePercentage =
      (this._visits.filter(visit => visit).length / this._visits.length) * 100

    return (averageGrade + attendancePercentage) / 2
  }

  setGrade(workName: string, mark: number): void {
    this._grades[workName] = mark
  }

  setVisit(lesson: string, present: boolean): void {
    this._visits[lesson] = present
  }
}

class School {
  private _areas: Area[] = []
  private _lecturers: Lecturer[] = []

  get areas(): Area[] {
    return this._areas
  }

  get lecturers(): Lecturer[] {
    return this._lecturers
  }

  addArea(area: Area): void {
    if (area instanceof Area) {
      this._areas.push(area)
    }
  }

  removeArea(area: Area): void {
    this._areas = this._areas.filter(a => a !== area)
  }

  addLecturer(lecturer: Lecturer): void {
    this._lecturers.push(lecturer)
  }

  removeLecturer(lecturer: Lecturer): void {
    this._lecturers = this._lecturers.filter(l => l !== lecturer)
  }
}
