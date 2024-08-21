/* eslint-disable @typescript-eslint/no-misused-promises */
import React, { useEffect } from 'react';
import { Box, Flex, HStack, IconButton, Menu, MenuButton, MenuList, MenuItem, MenuDivider,
  useDisclosure,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { logoutThunk } from '../../redux/auth/authActionThunk';


function Nlink({ to, children, ...props }: { to: string; ml?: number; children: React.ReactNode; onClick?: () => void }): JSX.Element {
  return (
    <BreadcrumbLink
      as={NavLink}
      to={to}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}
      px={2}
      py={1}
      rounded="md"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      {children}
    </BreadcrumbLink>
  );
}

export default function NavBar(): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (user.status === 'logged') {
      navigate('/');
    }
  }, [user.status, navigate]);

  const logoutHandler = async (): Promise<void> => {
    await dispatch(logoutThunk());
    navigate('/');
  };

  return (
    <Box bg={useColorModeValue('gray.800', 'blue.800')} px={4} boxShadow="dark-lg">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          color="white"
        />
        <HStack spacing={8} alignItems="center" color="white">
          <Box>{user.status === 'logged' ? user.username : 'гость'}</Box>
          <Breadcrumb as="nav" separator=">" color="white">
            <BreadcrumbItem>
              <Nlink to="/">Наша команда</Nlink>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <Nlink to="/cases">Наши кейсы</Nlink>
            </BreadcrumbItem>
            {user.status === 'logged' && user.id === 2 && (
              <BreadcrumbItem>
                <Nlink to="/adminiem7disk">Admin Page</Nlink>
              </BreadcrumbItem>
            )}
            {user.status !== 'logged' ? (
              <>
               <BreadcrumbItem>
                <Nlink to="/">Помощь дежурного адвоката</Nlink>
              </BreadcrumbItem>
                <BreadcrumbItem>
                  <Nlink to="/signin" ml={590}>Вход</Nlink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <Nlink to="/signup">Регистрация</Nlink>
                </BreadcrumbItem>
              </>
            ) : (
              <BreadcrumbItem>
                <Nlink to="/help">Помощь дежурного адвоката</Nlink>
              </BreadcrumbItem>
            )}
          </Breadcrumb>
        </HStack>
        {user.status === 'logged' && (
          <Flex alignItems="center" color="white">
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                aria-label="Options"
                variant="outline"
                colorScheme="whiteAlpha"
              />
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Settings</MenuItem>
                <MenuDivider />
                <MenuItem onClick={logoutHandler}>Выход</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
