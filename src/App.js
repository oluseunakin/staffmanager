import React, { useState } from 'react';
import {
  Button,
  ChakraProvider,
  Flex,
  Heading,
  Input,
  Stack,
  theme,
  Text,
  Box,
  Link,
  HStack,
  Spacer,
} from '@chakra-ui/react';

function App() {
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [employees, setEmployees] = useState([]);
  const [adminStatus, setAdminStatus] = useState('');
  const [adminStatusName, setAdminStatusName] = useState('');
  let user;
  let heading = (
    <Box align="center">
      <Heading>Welcome to Work</Heading>
      <Text>Enter your name to continue</Text>
    </Box>
  );
  let body = (
    <Stack w="fit-content" alignSelf="center">
      <Input
        defaultValue={name}
        onBlur={e => setName(e.target.value)}
        placeholder="Your name"
      />
      <Button>Welcome</Button>
    </Stack>
  );
  const users = [
    { name: 'seun akin', role: 'employee' },
    { name: 'wole akin', role: 'employee' },
    { name: 'ayo akin', role: 'admin' },
  ];

  function checkLogin(username) {
    user = users.find(user => {
      return user.name === username;
    });
    heading = <Text>You don't work here</Text>;
    body = ""
    if (user) {
      heading = (
        <Flex>
          <Heading as="span" textAlign="center">Welcome {user.name}</Heading>
          <Spacer />
          <Link p="4" color="blue"
            onClick={() => {
              setStatus('');
              setName('');
            }}
          >
            Logout
          </Link>
        </Flex>
      );
      if (user.role === 'employee')
        body = (
          <HStack spacing="6">
            <Button onClick={() => setStatus('leave')}>
              Check Leave Status
            </Button>
            <Button onClick={() => setStatus('salary')}>
              View Salary Details
            </Button>
            <Button onClick={() => setStatus('happynot')}>Happy or not?</Button>
          </HStack>
        );
      else
        body = (
          <Stack align="center">
            <Button
              onClick={() => {
                setEmployees(
                  users.filter(user => {
                    return user.role === 'employee';
                  })
                );
                setStatus('admin');
              }}
            >
              Manage Employees
            </Button>
          </Stack>
        );
    }
  }

  function getStatus() {
    if (status === 'leave') {
      return user.leave ? (
        <Text>Your leave starts {user.leave}</Text>
      ) : (
        <Text>Meet admin for your leave</Text>
      );
    } else if (status === 'salary') {console.log('what')
      return user.salary ? (
        <Text>Your salary is {user.salary}</Text>
      ) : (
        <Text>Meet admin for your salary details</Text>
      );
    } else if (status === 'happynot') {
      return (
        <Stack>
          <Input placeholder="Issues, tell admin" />
          <Button>Tell Admin</Button>
        </Stack>
      );
    } else {
      return (
        <Stack mt="4">
          {employees.map(employee => (
            <HStack key={employee.name}>
              <Text fontSize="lg">{employee.name}</Text>
              <Button onClick={() => setAdminStatus(`${employee.name}leave`)}>Set Leave</Button>
              {adminStatus === `${employee.name}leave` && (
                <>
                  <Input defaultValue="Enter values like 5 days, 3 months" onBlur={e => {
                    setAdminStatusName(e.target.value)
                    employee.leave = adminStatusName
                  }}/>
                  <Button>Confirm</Button>
                </>
              )}
              <Button onClick={() => setAdminStatus(`${employee.name}salary`)}>Set Salary</Button>
              {adminStatus === `${employee.name}salary` && (
                <>
                  <Input defaultValue="Enter values like £600, $1000" onBlur={e => {
                    setAdminStatusName(e.target.value)
                    employee.salary = adminStatusName
                  }} />
                  <Button>Confirm</Button>
                </>
              )}
            </HStack>
          ))}
        </Stack>
      );
    }
  }
  if (name) checkLogin(name);
  return (
    <ChakraProvider theme={theme}>
      
      <Stack>
        {heading}
        {body}
        {status && getStatus()}
      </Stack>
    </ChakraProvider>
  );
}

export default App;
