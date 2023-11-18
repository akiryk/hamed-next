import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/options';
import NavLink from '@/app/components/ui/NavLink';
import ThemeButton from '@/app/components/ui/ThemeButton';
import SignInButton from '@/app/components/ui/SignInButton';

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className='p-4'>
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-6 text-gray-500'>
          <li>
            <NavLink href='/'>Home</NavLink>
          </li>
          <li>
            <NavLink href='/about'>About</NavLink>
          </li>
          <li>
            <NavLink href='/posts'>Blog</NavLink>
          </li>
          {session && (
            <li>
              <NavLink href='/guestbook'>Guestbook</NavLink>
            </li>
          )}
        </ul>

        <div className='flex items-center gap-4'>
          <ThemeButton />
          <SignInButton />
        </div>
      </nav>
    </header>
  );
};

export default Header;
