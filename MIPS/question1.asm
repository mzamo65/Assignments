# Question 1 tempt
# JLXKHU003 - CSC2002S Assignment 5

	.data
prompt: .asciiz "Enter a number: \n"
msg:.asciiz "The single digit divisors are:\n"
newl:	.asciiz "\n"	
	.text
main:
	# Initialize
	li	$s0, 10
	li	$s1, 1
	li	$s2, 1
	li	$s3, 0
	li	$s4, 10
	
	# Input prompt
	li	$v0, 4
	la	$a0, prompt
	syscall
	
	# Read input
	li	$v0, 5
	syscall
	move	$s0, $v0
	
	# Print output message
	li	$v0, 4
	la	$a0, msg
	syscall
	
loop:	
	
	add	$s1, $s1, 1
	beq	$s1, $s4, stop
	div 	$s0, $s1
	mfhi	$t0
	# print $s1 if remainder = 0
	beqz	$t0, print
	# recursive looping
	b loop
		
print:			
	# Print successful divisor
	li	$v0, 1
	move	$a0, $s1
	syscall
	# Newline
	li	$v0, 4
	la	$a0, newl
	syscall
	# Loop back to label
	add	$t2, $t2, 1
	b loop
		
stop:
	# end program
	# call for program end
	li	$v0, 10
	syscall
	
