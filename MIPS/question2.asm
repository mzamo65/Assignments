	.data
prompt: .asciiz "Enter a number:"
Pby2:	.asciiz "It is divisible by 2\n"
Pby3:	.asciiz "It is divisible by 3\n"
Pby2and3:	.asciiz "It is divisible by both 2 and 3\n"
Pby2nor3:	.asciiz "It is neither divisible by 2 nor 3\n"
	
	
	.text
main:
	# Initialize
	li	$s0, 6
	li	$s1, 1
	li	$s2, 3
	li      $s3, 2
	li	$s4, 6
	
	# Input prompt
	li	$v0, 4
	la	$a0, prompt
	syscall
	
	# Read input
	li	$v0, 5
	syscall
	move	$s0, $v0
	
	
loop:	
	add	$s1, $s1, 1
	
	div 	$s0, $s3
	mfhi	$t1
	# divide by 3
	div 	$s0, $s2
	mfhi	$t4
	
	add     $t7, $t1, $t4
	beqz	$t7 by2and3 
	beqz    $t1, by2
	bgtz    $t4, by2nor3
	beqz	$t4, by3
	
	
	# recursive looping
	b loop
		
by2:	
        li	$v0, 4
	la	$a0, Pby2
	syscall	
	beq	$s1, $s4, end
	b p
	
by3:
	li	$v0, 4
	la	$a0, Pby3
	syscall	
	beq	$s1, $s4, end
	b p
	
by2and3:
	li	$v0, 4
	la	$a0, Pby2and3
	syscall	
	beq	$s1, $s4, end
	# Loop back to label
	b p
	
by2nor3:
	li	$v0, 4
	la	$a0, Pby2nor3
	syscall	
	beq	$s1, $s4, end
	# Loop back to label
	
	bne $s1, 6, p
	
p: 
	li	$v0, 4
	la	$a0, prompt
	syscall
	
	li	$v0, 5
	syscall
	move	$s0, $v0
	
	add	$t2, $t2, 1
	b loop

		
end:
	# end program
	# call for program end
	li	$v0, 10
	syscall