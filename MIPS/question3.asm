# Question 3
# JLXKHU003 - CSC2002S Assignment 5

	.data
prompt1:.asciiz "Enter the first number: \n"
prompt2:.asciiz "Enter the second number: \n"
notp:	.asciiz "The two numbers are not relatively prime"
prime:	.asciiz "The two numbers are relatively prime"
	
	
	.text
main:
	# Initialize
	li	$s0, 10
	li	$s1, 1
	li	$s4, 10
	
	# Input prompt
	li	$v0, 4
	la	$a0, prompt1
	syscall
	
	# Read input
	li	$v0, 5
	syscall
	move	$s0, $v0
	
	li	$v0, 4
	la	$a0, prompt2
	syscall
	
	# Read input
	li	$v0, 5
	syscall
	move	$s6, $v0
	
loop:	
	
	add	$s1, $s1, 1
	
	beq	$s1, $s4, Pprime
	
	div 	$s0, $s1
	mfhi	$t1
	
	div 	$s6, $s1
	mfhi	$t4
	
	add     $t7, $t1, $t4
	beqz	$t7 Pnot
	# recursive looping
	b loop
		
Pprime:			
	# Print successful divisor
	li	$v0, 4
	la	$a0, prime
	syscall
	b end
	
Pnot:			
	# Print successful divisor
	li	$v0, 4
	la	$a0, notp
	syscall
	b end
		
end:
	# end program
	# call for program end
	li	$v0, 10
	syscall