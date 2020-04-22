# A makefile

JC = javac
JFLAGS = -g
BINDIR=./bin
SRCDIR=./src
DOCDIR=./javadocs

.SUFFIXES: .java .class

${BINDIR}/%.class: ${SRCDIR}/%.java
	javac $< -cp ${BINDIR} -d ${BINDIR}

${BINDIR}/HashApp.class: ${BINDIR}/LinkedList.class ${BINDIR}/sort.class ${BINDIR}/aux.class ${SRCDIR}/HashApp.java


clean:
	rm -f ${BINDIR}/*.class

run:
	java -cp ./bin HashApp

docs:
	javadoc  -classpath ${BINDIR} -d ${DOCDIR} ${SRCDIR}/*.java

cleandocs:
	rm -rf ${DOCDIR}/*

#Code From:
#www.cs.swarthmore.edu
