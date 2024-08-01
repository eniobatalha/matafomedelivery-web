import { useRouter } from 'next/navigation'; // Hook correto para estrutura app
import { Button } from '@/components/ui/button';

const BackButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push('/login');
  };

  return (
    <Button variant="destructive" type="button" className="w-full" onClick={handleClick}>
      Voltar
    </Button>
  );
};

export default BackButton;
