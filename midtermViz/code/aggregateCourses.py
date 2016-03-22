import operator,sys
import csv

def main():

    with open(sys.argv[1], 'r') as csvIn:
        reader = csv.DictReader(csvIn)
        with open(sys.argv[2], 'w') as csvOut:
            writer = csv.writer(csvOut)
            writer.writerow(["semester", "department",
                "area", "respondents", "total"])
            
            total = 0
            respondents = 0
            semester = ""
            dept = ""
            area = ""
            first = True
            for row in reader:
                currSemester = row["semester"]
                currDept = row["department"]
                currArea = row["area"]
                currRespondents = int(row["respondents"])
                currTotal = int(row["total"])
                if currSemester == semester and currDept == dept:
                    total += currTotal
                    respondents += currRespondents
                else:
                    if not first:
                        sf = semester[0]
                        year = semester.split()[1]
                        year = year[-2:]
                        writeSem = sf + year
                        writer.writerow([writeSem, dept, area,
                            respondents, total])
                    total = currTotal
                    respondents = currRespondents
                    semester = currSemester
                    dept = currDept
                    area = currArea
                    first = False
                #print respondents, total

if __name__ == '__main__':
    main()